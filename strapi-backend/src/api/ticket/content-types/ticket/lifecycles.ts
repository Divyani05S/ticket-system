export default {
    async beforeCreate(event) {
        // Automatically publish the ticket upon creation
        event.params.data.publishedAt = new Date();
    },
};
