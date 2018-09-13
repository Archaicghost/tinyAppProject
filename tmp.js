const cookies = {
    "1": {
        id: "1",
        name: "oreo",
        flavour: "chocolate"
    },
    "2": {
        id: "2",
        name: "ginger snap",
        flavour: "ginger"
    }
};



// console.log(cookies['2'].name);

for ( let key in cookies) {
  console.log(cookies[key].name)
};



// const cookie = {
//     name: "oreo",
//     flavour: "chocolate"
// };

// let key = "flavour";

// console.log(cookie.name);
// console.log(cookie['name']);
// console.log(cookie[key]);