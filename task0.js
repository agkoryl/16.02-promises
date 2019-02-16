

class Users {

    constructor(containerId) {
        this.container = document.getElementById(containerId);

        this.users = {};
        this.myPromiseObject = null;
        this.init();
    }

    init() {

        this.fetchUsers();
        this.myPromise();
    }

    myPromise() {
       
        const getMyOrder = (menu, order) => {
            return new Promise((resolve, reject) => {
                if (menu.includes(order)) {
                    resolve("Yeah");
                } else {
                    reject("Brak w menu");
                }
            });
        }

        getMyOrder(['sandwich', 'soup', 'drink'], 'soup').then(resolveText => {
            console.log(resolveText)
        })
        .catch(rejectText => {
            console.log(rejectText)
        })
    }

 

    fetchUsers() {
        fetch('https://randomuser.me/api/?results=10&gender=female')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.users = data;

                this.render();
                fetch('https://randomuser.me/api/?nat=gb&results=50')
                .then(response => response.json())
                .then(data => {
                    this.users = data;
                    this.render();
                })
            })
            .catch(error => { console.error('error'); });

    }

    render() {
        const row = document.createElement('div');

        if (!this.users.results) {
            return;
        }
        this.users.results.forEach(element => {
            const div = document.createElement('div');
            div.innerHTML = `
            <h2>${element.name.first} ${element.name.last}</h2>
            <img src=${element.picture.thumbnail}> mobile: ${element.cell}
            <hr/>`


            row.appendChild(div);
        });

        this.container.appendChild(row);
    }

}

const list = new Users('root');