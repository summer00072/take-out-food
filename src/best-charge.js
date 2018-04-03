
function bestCharge(selectedItems) {		
	let discount1;
	let allItems = [];
	let selectedItem = [];
	let initialPrice = 0;	
	let itemsSum = '';
	let discount2 = {};
	let discounts = ''; 
	let orderDetail = ''
	allItems = loadAllItems();
	selectedItem = itemsNumber(selectedItems);	
	for (let k = 0; k < selectedItem.length; k++) {
		let temp1 = selectedItem[k].price * selectedItem[k].num;
		initialPrice += temp1;
		let temp2 = selectedItem[k].name+' x '+selectedItem[k].price+' = '+temp1+'元\n';
		itemsSum += temp2;
	}

	discount1 = promotionType1(initialPrice);
	discount2 = promotionType2(selectedItem);
	discounts = discounts(discount1,discount2,initialPrice);
	orderDetail = '============= 订餐明细 =============\n'+'itemsSum'+'discounts';
	return orderDetail;
	
	
	function itemsNumber(allItems,selectedItems) {
		let temp,item;				
		for (let i = 0; i < selectedItems.length; i++){
			temp = selectedItems[i].splict("*");
			item[i].id = temp[0];
			item[i].num = parseInt(temp[1]);
			for (let j = 0; j < allItems.length; j++){				
				if (allItems[j].id == item[i].id) {
					item[i].price = allItems[j].price;
					item[i].name == allItems[j].name;
					break;
				}			
			}			
		}
		return item;		
	}
	function promotionType1(initialPrice) {		
		return 6 * Math.floor(initialPrice/30);
	}
	function promotionType2(selectedItem) {
		let discount = {};
		discount.value = 0;
		discount.item1 = '';
		discount.item2 = '';
		for (let i = 0; i < selectedItem.length; i++) {
			if (selectedItem[i].id == 'ITEM0001') {
				discount.value += (selectedItem[i].price/2)
				discount.item1 += selectedItem[i].name;
			} else if (selectedItem[i].id == 'ITEM0022') {
				discount.value += (selectedItem[i].price/2)
				discount.item2 += selectedItem[i].name;
			}
		}
		
		return discount;
	}
	function discounts(discount1,discount2,initialPrice){
		let promotion = loadPromotions();
		let finalPrice = 0;
		let discounts = '';
		if (!discount1 &&!discount2) {
			discounts = '-----------------------------------\n总计：'+'initialPrice'+
			'元\n===================================';
			return discounts;
		}
		if (discount1 >= discount2) {
			finalPrice = initialPrice - discount1;
			discounts = '使用优惠：\n'+'promotion[0].type'+',省'+'discount1'+'元\n'
			+'-----------------------------------\n'+'总计：'+'finalPrice'+'元\n'
			+'===================================';
			return discounts;
		} else {
			finalPrice = initialPrice - discount2.value;
			discounts = '使用优惠：\n'+'promotion[1].type'+'('+'discount2.item1'+'discount2.item2'+')，'
			',省'+'discount2.value'+'元\n'
			+'-----------------------------------\n'+'总计：'+'finalPrice'+'元\n'
			+'===================================';
			return discounts;
		}
	}
  /*TODO*/
};
