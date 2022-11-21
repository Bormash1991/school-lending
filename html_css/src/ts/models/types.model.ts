type CardTypeForSlickSlider = {
  id?: number;
  personImg: string;
  backUrl: string;
  category: string;
  title: string;
  price: string;
  oldPrice: string;
  countOfStars: number;
};
type CardTypeForCustomerPaginator = {
  imgUrl: string;
  color: string;
  text: string;
  author: string;
};
type CardTypeForPaginator = {
  id?: string;
  title: string;
  url: string;
  userImage: string;
  redirectLink: string;
  category: string;
};
type CardTypeForNativeSlider = {
  albumId?: string;
  id?: string;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export {
  CardTypeForSlickSlider,
  CardTypeForCustomerPaginator,
  CardTypeForPaginator,
  CardTypeForNativeSlider,
};
