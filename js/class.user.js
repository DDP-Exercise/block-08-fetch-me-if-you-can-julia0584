"use strict";

export class User {

    constructor(id, name, username, email, website){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;
        this.posts = [];
    }

}

