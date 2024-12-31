export default {
  docs: {
    allow: {
      view: "data.is_public || data.owner == auth.id",
    },
  },
};
