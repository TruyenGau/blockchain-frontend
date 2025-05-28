// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Dappazon {
    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 price;
        string shortDesc;
        uint256 stock;
        address seller;
    }

    struct Purchase {
        uint256 itemId;
        uint256 quantity;
        uint256 purchaseTime;
    }

    struct FullPurchase {
        address buyer;
        uint256 itemId;
        uint256 quantity;
        uint256 purchaseTime;
    }

    struct Review {
        address reviewer;
        uint8 rating;
        string comment;
        uint timestamp;
    }

    mapping(uint256 => Item) public items;
    mapping(address => Purchase[]) public userPurchases;
    mapping(uint => Review[]) public productReviews;
    mapping(address => mapping(uint => bool)) public hasReviewed;

    FullPurchase[] public allPurchases; // ✅ Danh sách tất cả đơn hàng

    uint256 public itemCount;

    event ProductAdded(uint256 id, string name, address seller);
    event ProductUpdated(uint256 id, string name, address seller);
    event ProductDeleted(uint256 id);
    event Buy(
        address buyer,
        uint256 itemId,
        uint256 quantity,
        uint256 purchaseTime
    );
    event PaymentReceived(address seller, uint256 amount);
    event ReviewSubmitted(
        address reviewer,
        uint itemId,
        uint8 rating,
        string comment
    );

    function addProduct(
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _price,
        string memory _shortDesc,
        uint256 _stock
    ) public {
        itemCount++;
        items[itemCount] = Item(
            itemCount,
            _name,
            _category,
            _image,
            _price,
            _shortDesc,
            _stock,
            msg.sender
        );
        emit ProductAdded(itemCount, _name, msg.sender);
    }

    function updateProduct(
        uint256 _itemId,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _price,
        string memory _shortDesc,
        uint256 _stock
    ) public {
        Item storage item = items[_itemId];
        require(item.seller == msg.sender, "You are not the seller");
        require(item.seller != address(0), "Product does not exist");

        item.name = _name;
        item.category = _category;
        item.image = _image;
        item.price = _price;
        item.shortDesc = _shortDesc;
        item.stock = _stock;

        emit ProductUpdated(_itemId, _name, msg.sender);
    }

    function deleteProduct(uint256 _itemId) public {
        Item storage item = items[_itemId];
        require(item.seller == msg.sender, "You are not the seller");
        require(item.seller != address(0), "Product does not exist");

        item.stock = 0;
        item.seller = address(0);
        emit ProductDeleted(_itemId);
    }

    function buy(uint256 _itemId, uint256 _quantity) public payable {
        Item storage item = items[_itemId];
        require(item.stock >= _quantity, "Not enough stock");
        require(msg.value == item.price * _quantity, "Incorrect payment");

        payable(item.seller).transfer(msg.value);

        userPurchases[msg.sender].push(
            Purchase(_itemId, _quantity, block.timestamp)
        );

        allPurchases.push(
            FullPurchase(msg.sender, _itemId, _quantity, block.timestamp)
        );

        item.stock -= _quantity;

        emit PaymentReceived(item.seller, msg.value);
        emit Buy(msg.sender, _itemId, _quantity, block.timestamp);
    }

    function buyMultiple(
        uint256[] memory itemIds,
        uint256[] memory quantities
    ) public payable {
        require(itemIds.length == quantities.length, "Mismatched arrays");

        uint256 totalPrice = 0;

        for (uint i = 0; i < itemIds.length; i++) {
            Item storage item = items[itemIds[i]];
            require(item.stock >= quantities[i], "Insufficient stock");
            totalPrice += item.price * quantities[i];
        }

        require(msg.value == totalPrice, "Incorrect total payment");

        for (uint i = 0; i < itemIds.length; i++) {
            Item storage item = items[itemIds[i]];
            item.stock -= quantities[i];

            userPurchases[msg.sender].push(
                Purchase(itemIds[i], quantities[i], block.timestamp)
            );

            allPurchases.push(
                FullPurchase(
                    msg.sender,
                    itemIds[i],
                    quantities[i],
                    block.timestamp
                )
            );

            payable(item.seller).transfer(item.price * quantities[i]);

            emit PaymentReceived(item.seller, item.price * quantities[i]);
            emit Buy(msg.sender, itemIds[i], quantities[i], block.timestamp);
        }
    }

    function getUserPurchases(
        address user
    )
        public
        view
        returns (
            uint256[] memory itemIds,
            uint256[] memory quantities,
            uint256[] memory purchaseTimes
        )
    {
        uint256 count = userPurchases[user].length;
        itemIds = new uint256[](count);
        quantities = new uint256[](count);
        purchaseTimes = new uint256[](count);

        for (uint i = 0; i < count; i++) {
            itemIds[i] = userPurchases[user][i].itemId;
            quantities[i] = userPurchases[user][i].quantity;
            purchaseTimes[i] = userPurchases[user][i].purchaseTime;
        }
    }

    function getReviews(
        uint itemId
    )
        public
        view
        returns (
            address[] memory reviewers,
            uint8[] memory ratings,
            string[] memory comments,
            uint[] memory timestamps
        )
    {
        uint len = productReviews[itemId].length;
        reviewers = new address[](len);
        ratings = new uint8[](len);
        comments = new string[](len);
        timestamps = new uint[](len);

        for (uint i = 0; i < len; i++) {
            Review memory r = productReviews[itemId][i];
            reviewers[i] = r.reviewer;
            ratings[i] = r.rating;
            comments[i] = r.comment;
            timestamps[i] = r.timestamp;
        }
    }

    function addReview(
        uint itemId,
        uint8 rating,
        string memory comment
    ) public {
        require(rating >= 1 && rating <= 5, "Invalid rating");

        bool purchased = false;
        for (uint i = 0; i < userPurchases[msg.sender].length; i++) {
            if (userPurchases[msg.sender][i].itemId == itemId) {
                purchased = true;
                break;
            }
        }

        require(purchased, "Must purchase to review");
        require(!hasReviewed[msg.sender][itemId], "Already reviewed");

        productReviews[itemId].push(
            Review(msg.sender, rating, comment, block.timestamp)
        );
        hasReviewed[msg.sender][itemId] = true;

        emit ReviewSubmitted(msg.sender, itemId, rating, comment);
    }

    // ✅ Trả về toàn bộ đơn hàng của tất cả người dùng
    function getAllPurchases()
        public
        view
        returns (
            address[] memory buyers,
            uint256[] memory itemIds,
            uint256[] memory quantities,
            uint256[] memory purchaseTimes
        )
    {
        uint count = allPurchases.length;
        buyers = new address[](count);
        itemIds = new uint256[](count);
        quantities = new uint256[](count);
        purchaseTimes = new uint256[](count);

        for (uint i = 0; i < count; i++) {
            buyers[i] = allPurchases[i].buyer;
            itemIds[i] = allPurchases[i].itemId;
            quantities[i] = allPurchases[i].quantity;
            purchaseTimes[i] = allPurchases[i].purchaseTime;
        }
    }
}
