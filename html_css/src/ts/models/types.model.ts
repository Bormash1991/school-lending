type cardTypeForSlickSlider = {
  id?: number;
  personImg: string;
  backUrl: string;
  category: string;
  title: string;
  price: string;
  oldPrice: string;
  countOfStars: number;
};
type cardTypeForCustomerPaginator = {
  imgUrl: string;
  color: string;
  text: string;
  author: string;
};
type cardTypeForPaginator = {
  id?: string;
  title: string;
  url: string;
  userImage: string;
  redirectLink: string;
  category: string;
};
type cardTypeForNativeSlider = {
  albumId?: string;
  id?: string;
  title: string;
  url: string;
  thumbnailUrl: string;
};
export {
  cardTypeForSlickSlider,
  cardTypeForCustomerPaginator,
  cardTypeForPaginator,
  cardTypeForNativeSlider,
};
