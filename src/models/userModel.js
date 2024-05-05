
class User {
    constructor(id, first_name, last_name, email, password, contact_number) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.contact_number = contact_number;
    }
}

module.exports = User;