import { humburger } from "./mobile-menu.js";
import { headerAppearsWithScroll } from "./header-scroll.js";
import { paginator } from "./paginator.js";
window.addEventListener("DOMContentLoaded", () => {
  const dataForPaginator = [
    {
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      userImage: "https://via.placeholder.com/150/92c952",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      userImage: "https://via.placeholder.com/150/771796",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "https://via.placeholder.com/600/24f355",
      userImage: "https://via.placeholder.com/150/24f355",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      url: "https://via.placeholder.com/600/d32776",
      userImage: "https://via.placeholder.com/150/d32776",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      userImage: "https://via.placeholder.com/150/f66b97",
      redirectLink: "https://jsonplaceholder.typicode.com",
      category: "Design",
    },
  ];
  humburger();
  headerAppearsWithScroll();
  paginator(dataForPaginator);
  $(".course__slider-wrap").slick({
    slidesToShow: 3,
    speed: 500,
    prevArrow: document.querySelector(".course__slider-btn_left"),
    nextArrow: document.querySelector(".course__slider-btn_right"),

    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 375,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  });
});
