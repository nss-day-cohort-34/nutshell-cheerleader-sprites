import dom from "./dom";

const data = Object.create({
    // ==================== Users Section =====================
    saveData: (resource, object) => {
        return fetch(`http://localhost:8088/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(response => response.json());
    },

    getData: (resource) => {
        return fetch(`http://localhost:8088/${resource}`)
            .then(response => response.json());
    },

    deleteData: (resource, resourceId) => {
        return fetch(`http://localhost:8088/${resource}/${resourceId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    },

    editData: (resource, resourceId, object) => {
        return fetch(`http://localhost:8088/${resource}/${resourceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(response => response.json())
    },
<<<<<<< HEAD

=======
>>>>>>> master
    // ==================== Friendships Section =====================







    // ==================== Events Section =====================







    // ==================== News Section =====================
    updateFormFields: (newsID) => {
        const hiddenNewsID = document.querySelector("#newsID")
        const newsDate = document.querySelector("#newsDate")
        const newsTitle = document.querySelector("#newsTitle")
        const newsSummary = document.querySelector("#newsSummary")
        const newsURL = document.querySelector("#newsURL")
        fetch(`http://localhost:8088/news/${newsID}`)
        .then(response => response.json())
        .then(news => {
            hiddenNewsID.value = news.id
            newsDate.value = news.date
            newsTitle.value = news.title
            newsSummary.value = news.summary
            newsURL.value = news.url
        })
    },
    editNews: id => {
        const updatedObject = {
            url: document.querySelector("#newsURL").value,
            date: document.querySelector("#newsDate").value,
            title: document.querySelector("#newsTitle").value,
            summary: document.querySelector("#newsSummary").value
        }
        return fetch(`http://localhost:8088/news/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObject)
        })
        .then(res => res.json())
    }






    // ==================== Tasks Section =====================







    // ==================== Messages Section =====================
    getMessages: () => {
        return fetch("http://localhost:8088/messages?_expand=user")
            .then(response => response.json());
    }
});

export default data;

