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
    }


    // ==================== Friendships Section =====================







    // ==================== Events Section =====================







    // ==================== News Section =====================







    // ==================== Tasks Section =====================







    // ==================== Messages Section =====================
});

export default data;

