export default {
  docs: {
    allow: {
      update: "data.is_public || data.owner == auth.id",
    },
  },
};
