import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    let tempProducts = [...filtered_products];

    // LINK: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    if (sort === 'price-lowest') {
      /* Without sort()
      tempProducts = tempProducts.sort((lowestPrice, highestPrice) => {
        if (lowestPrice < highestPrice) {
          return -1;
        }
        if (lowestPrice > highestPrice) {
          return 1;
        }
        return 0;
      });
      */
      // Using sort()
      tempProducts = tempProducts.sort(
        (lowestPrice, highestPrice) => lowestPrice.price - highestPrice.price
      );
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort(
        (lowestPrice, highestPrice) => highestPrice.price - lowestPrice.price
      );
    }

    // LINK: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((firstItem, nextItem) => {
        return firstItem.name.localeCompare(nextItem.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((firstItem, nextItem) => {
        return nextItem.name.localeCompare(firstItem);
      });
    }

    return { ...state, filtered_products: tempProducts };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
