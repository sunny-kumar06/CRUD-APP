const express = require("express"); //express ko import krne k liye
const app = express(); 


const path = require("path"); //path module ko import krne k liye
const port = process.env.PORT || 8080;


// const { use } = require("react");
const{v4 : uuidv4} = require('uuid'); //unique id generate krne k liye
const methodOverride = require('method-override'); //method override krne k liye


app.use(express.urlencoded({ extended: true })); //form data ko read krne k liye
app.use(methodOverride("_method")); //method override ko use krne k liye
//set the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//public static file serve krne k liye
app.use(express.static(path.join(__dirname, "public")));//public k liye CSS file serve krne k liye
//data
let post = [
    {
       id: uuidv4(),
        username: "Sunny",
        
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        
    },

    {
        id: uuidv4(),
       username: "John",
       
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },

    {    
      id: uuidv4(),       
        username: "Alice",
        
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    } 
];

app.get("/", (req, res) => {
  res.redirect("/posts");
});

//post local route
app.get("/posts", (req, res) => {
  res.render("index.ejs" , { posts: post });
});
//submit press krne pr 
app.post("/posts", (req, res) => {
 let {username , content} = req.body;
 let id = uuidv4();
    post.push({ id,username, content });
    res.redirect("/posts"); //wapas /posts pr redirect krdo
});
//neew post route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});


app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
 let post1 = post.find((p) => p.id === id);
   if (!post1) {
    return res.send("Post not found ❌");
  }
 console.log(id);
  res.render("show.ejs", { post: post1 });
});

// app.patch("/posts/:id", (req, res) => {
//   let { id } = req.params;
//  let post1 = post.find((p) => p.id === id);
//    if (!post1) {
//     return res.send("Post not found ❌");
//   }
//  console.log(id);
//  post1.content = content;
//  res.redirect("/posts");
// }); 



app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { content } = req.body; // ⭐ THIS LINE WAS MISSING

  let post1 = post.find((p) => p.id === id);

  if (!post1) {
    return res.send("Post not found ❌");
  }

  post1.content = content; // ✅ NOW IT WORKS
  res.redirect("/posts");
});


app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
 let post1 = post.find((p) => p.id === id);
   if (!post1) {
    return res.send("Post not found ❌");
  }
 console.log(id);
  res.render("edit.ejs", { post: post1 });
});  

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  post = post.filter((p) => p.id !== id);
  res.redirect("/posts");
});


//home route
// app.listen(port, () => { 
//   console.log(`Server is running on http://localhost:${port}`);
// });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

