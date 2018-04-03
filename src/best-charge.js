
function bestCharge(selectedItems) {		
	let discount1 = 0;
	let allItems = [];
	let selectedItem = [];
	let initialPrice = 0;	
	let itemsSum = '';
	let discount2 = {};
	let discounts = ''; 
	let orderDetail = ''
	allItems = loadAllItems();
	selectedItem = itemsNumber(selectedItems, allItems);	
	for (let k = 0; k < selectedItem.length; k++) {
		let temp1 = selectedItem[k].price * selectedItem[k].num;
		initialPrice += temp1;
		let temp2 = selectedItem[k].name+' x '+selectedItem[k].num+' = '+temp1+'元\n';
		itemsSum += temp2;
	}

	discount1 = promotionType1(initialPrice);
	discount2 = promotionType2(selectedItem);
	discounts = discount(discount1,discount2,initialPrice);
	orderDetail = '============= 订餐明细 =============\n'+itemsSum+discounts;
	return orderDetail;
	

	function itemsNumber(selectedItems, allItems) {
		let items = [];
		let id_value,price_value,name_value,num_value;
		for (let i = 0; i < selectedItems.length; i++){
			let temp = [];
			let item = {};
			temp = selectedItems[i].split(' x ');
			id_value = temp[0];
			num_value = parseInt(temp[1]);
			for (let j = 0; j < allItems.length; j++){				
				if (allItems[j].id == id_value) {
					price_value = allItems[j].price;
					name_value = allItems[j].name;
					break;
				}			
			}
			item = {id:id_value, num:num_value, price:price_value, name:name_value};
			items.push(item);
		}
		return items;		
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
				discount.item1 = selectedItem[i].name;
			} else if (selectedItem[i].id == 'ITEM0022') {
				discount.value += (selectedItem[i].price/2)
				discount.item2 = selectedItem[i].name;
			}
		}
		
		return discount;
	}
	function discount(discount1,discount2,initialPrice){
		let promotion = loadPromotions();
		let finalPrice = 0;
		let discounts = '';
		if (discount1 == 0 &&discount2.value == 0) {
			discounts = '-----------------------------------\n总计：'+initialPrice+
			'元\n===================================';
			return discounts;
		}
		if (discount1 >= discount2.value) {
			finalPrice = initialPrice - discount1;
			discounts = '-----------------------------------\n使用优惠：\n'+promotion[0].type+'，省'+discount1+'元\n'
			+'-----------------------------------\n'+'总计：'+finalPrice+'元\n'
			+'===================================';
			return discounts;
		} else {
			let discountItem = '';
			if ((discount2.item1 !='') && (discount2.itme2 != '')) {
				discountItem = discount2.item1+'，'+discount2.item2;
			} else {
				discountItem = discount2.item1+discount2.item2;
			}
			finalPrice = initialPrice - discount2.value;
			discounts = '-----------------------------------\n使用优惠：\n'+promotion[1].type+'('+discountItem+')，省'+discount2.value+'元\n'
			+'-----------------------------------\n'+'总计：'+finalPrice+'元\n'
			+'===================================';
			return discounts;
		}
	}
  /*TODO*/
};
module.exports = bestCharge();