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

    mapping(uint256 => Item) public items; // Lưu các sản phẩm
    mapping(address => Purchase[]) public userPurchases; // Lưu các sản phẩm đã mua cho từng địa chỉ người dùng
    uint256 public itemCount;

    event ProductAdded(uint256 id, string name, address seller);
    event ProductUpdated(uint256 id, string name, address seller); // Sự kiện khi sản phẩm được cập nhật
    event ProductDeleted(uint256 id); // Sự kiện khi sản phẩm bị xóa
    event Buy(
        address buyer,
        uint256 itemId,
        uint256 quantity,
        uint256 purchaseTime
    ); // Thêm purchaseTime vào sự kiện
    event PaymentReceived(address seller, uint256 amount); // khai báo một sự kiện

    // Thêm sản phẩm mới
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

        // Kiểm tra xem người gọi có phải là người bán sản phẩm không
        require(
            item.seller == msg.sender,
            "You are not the seller of this product"
        );
        require(item.seller != address(0), "Product does not exist");

        // Cập nhật thông tin sản phẩm
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

        require(
            item.seller == msg.sender,
            "You are not the seller of this product"
        );
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

        item.stock -= _quantity;

        emit PaymentReceived(item.seller, msg.value); // phát một sự kiện
        emit Buy(msg.sender, _itemId, _quantity, block.timestamp);
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
        uint256 purchaseCount = userPurchases[user].length;
        itemIds = new uint256[](purchaseCount);
        quantities = new uint256[](purchaseCount);
        purchaseTimes = new uint256[](purchaseCount);

        for (uint i = 0; i < purchaseCount; i++) {
            itemIds[i] = userPurchases[user][i].itemId;
            quantities[i] = userPurchases[user][i].quantity;
            purchaseTimes[i] = userPurchases[user][i].purchaseTime;
        }

        return (itemIds, quantities, purchaseTimes);
    }
}
