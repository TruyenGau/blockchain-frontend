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
        address seller; // Thông tin người bán
    }

    struct Purchase {
        uint256 itemId;
        uint256 quantity;
    }

    mapping(uint256 => Item) public items; // Lưu các sản phẩm
    mapping(address => Purchase[]) public userPurchases; // Lưu các sản phẩm đã mua cho từng địa chỉ người dùng
    uint256 public itemCount;

    event ProductAdded(uint256 id, string name, address seller);
    event Buy(address buyer, uint256 itemId, uint256 quantity);
    event PaymentReceived(address seller, uint256 amount); // Sự kiện ghi nhận giao dịch

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

    // Mua sản phẩm
    function buy(uint256 _itemId, uint256 _quantity) public payable {
        Item storage item = items[_itemId];
        require(item.stock >= _quantity, "Not enough stock");
        require(msg.value == item.price * _quantity, "Incorrect payment");

        // Gửi tiền cho người bán
        payable(item.seller).transfer(msg.value);

        // Lưu lại thông tin giao dịch cho người dùng
        userPurchases[msg.sender].push(Purchase(_itemId, _quantity));

        // Giảm số lượng tồn kho
        item.stock -= _quantity;

        emit PaymentReceived(item.seller, msg.value);
        emit Buy(msg.sender, _itemId, _quantity);
    }

    // Lấy danh sách các sản phẩm đã mua của người dùng
    function getUserPurchases(
        address user
    )
        public
        view
        returns (uint256[] memory itemIds, uint256[] memory quantities)
    {
        uint256 purchaseCount = userPurchases[user].length;
        itemIds = new uint256[](purchaseCount);
        quantities = new uint256[](purchaseCount);

        for (uint i = 0; i < purchaseCount; i++) {
            itemIds[i] = userPurchases[user][i].itemId;
            quantities[i] = userPurchases[user][i].quantity;
        }

        return (itemIds, quantities);
    }
}
