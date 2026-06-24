"use strict";

import { User } from "./class.user.js";
import { Post } from "./class.post.js";

const allUsers = [];

function getUsers(){
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
            for(var i = 0; i < data.length; i++){
                const user = new User(data[i].id, data[i].name, data[i].username, data[i].email, data[i].website);
                allUsers.push(user);
            }
            console.log(allUsers);
        })
}

const allPosts = [];

function getPosts(){
    return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            for(var i = 0; i < data.length; i++){
                const post = new Post(data[i].id, data[i].title, data[i].body);
                allPosts.push(post);

                for(var x = 0; x < allUsers.length; x++){
                    if(allUsers[x].id === data[i].userId){
                        allUsers[x].posts.push(post);
                    }
                }
            }
            console.log(allPosts);
            console.log(allUsers);
        })
}


const userlist = document.querySelector("#userlist");

function showDetails(e){
    if (e.target.classList.contains("about")) {

        const div = e.target.parentElement;
        const details = div.querySelector(".details");

        if(details.hidden === false){
            details.hidden = true;
            e.target.textContent = "about";
        } else {
            details.hidden = false;
            e.target.textContent = "close";
        }
    }

    if (e.target.classList.contains("comments")) {

        const post = e.target.parentElement;
        const postId = e.target.dataset.postId;
        const comments = post.querySelector(".commentsBox");

        if(comments.hidden === true){
            comments.hidden = false;
            e.target.textContent = "close comments";
        } else {
            comments.hidden = true;
            e.target.textContent = "see comments";
        }

        fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
            .then(res => res.json())
            .then(data => {
                for(var i = 0; i < data.length; i++){
                    const comment = document.createElement("p");
                    comment.innerHTML = "<strong>" + data[i].name + ": </strong>" + data[i].body;
                    comments.append(comment);
                }
            });
    }
}

userlist.addEventListener("click", showDetails);

function print(){
    for(var i = 0; i < allUsers.length; i++){

        const div = document.createElement("div");
        div.classList.add("user");

        const name = document.createElement("span");
        name.textContent = allUsers[i].username;

        const btn = document.createElement("button");
        btn.textContent = "about";
        btn.classList.add("about");

        const details = document.createElement("div");
        details.classList.add("details");
        details.hidden = true;

        const nameDetails = document.createElement("p");
        nameDetails.innerHTML = "<strong>Name: </strong>"+allUsers[i].name;
        details.append(nameDetails);

        const mail = document.createElement("a");
        mail.innerHTML = "<strong>E-Mail: </strong>"+allUsers[i].email;
        mail.href = "mailto:" + allUsers[i].email;
        details.append(mail);

        const br = document.createElement("br");
        details.append(br);
        const brr = document.createElement("br");
        details.append(brr);

        const web = document.createElement("a");
        web.innerHTML = "<strong>Webiste: </strong>"+allUsers[i].website;
        web.href = "https://" + allUsers[i].website;
        web.target = "_blank";
        details.append(web);

        const brrr = document.createElement("br");
        details.append(brrr);

        const postsHeader = document.createElement("p");
        postsHeader.innerHTML = "<strong>Posts of "+allUsers[i].username+": </strong>";
        details.append(postsHeader);

        let len = allUsers[i].posts.length
        for(var n = 0; n < len; n++){
            const post = document.createElement("p");
            post.innerHTML = "<strong>"+allUsers[i].posts[n].title +": </strong>"+ allUsers[i].posts[n].body;
            details.append(post);

            const brPost = document.createElement("br");
            post.append(brPost);


            const commentBtn = document.createElement("button");
            commentBtn.textContent = "see comments";
            commentBtn.classList.add("comments");
            commentBtn.dataset.postId = allUsers[i].posts[n].id;
            post.append(commentBtn);

            const comments = document.createElement("p");
            comments.classList.add("commentsBox");
            comments.hidden = true;
            post.append(comments);
        }


        div.append(name);
        div.append(btn);
        div.append(details);

        userlist.append(div);

    }
}

getUsers()
    .then(() => getPosts())
    .then(() => print())