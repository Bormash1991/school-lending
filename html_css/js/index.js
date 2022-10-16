import { humburger } from "./mobile-menu.js";
import { headerAppearsWithScroll } from "./header-scroll.js";
import { paginator } from "./paginator.js";
import { coursesSlider } from "./courses-slider.js";
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
  const dataForCoursesSlider = [
    {
      id: 1,
      personImg: "img/course/persone/first.jpg",
      backUrl: "img/course/itemBack/first.jpg",
      category: "Design",
      title: "Learn Photoshop title",
      price: "260",
      oldPrice: "360",
      countOfStars: 4,
    },
    {
      id: 2,
      personImg: "img/course/persone/third.jpg",
      backUrl: "img/course/itemBack/second.jpg",
      category: "Marketing",
      title: " Learn Photoshop title trun",
      price: "260",
      oldPrice: "360",
      countOfStars: 4,
    },
    {
      id: 3,
      personImg: "img/course/persone/second.jpg",
      backUrl: "img/course/itemBack/third.jpg",
      category: "Web design",
      title: "Learn Photoshop",
      price: "260",
      oldPrice: "360",
      countOfStars: 5,
    },
    {
      id: 4,
      personImg: "img/course/persone/third.jpg",
      backUrl: "img/course/itemBack/second.jpg",
      category: "Test Slide",
      title: "Learn Photoshop test",
      price: "260",
      oldPrice: "360",
      countOfStars: 3,
    },
  ];
  humburger();
  headerAppearsWithScroll();
  paginator(dataForPaginator);
  coursesSlider(dataForCoursesSlider);
});
