export const selectAllBlogs = (state) => state.blog.blogs;
export const selectCurrentBlog = (state) => state.blog.currentBlog;
export const selectBlogsLoading = (state) => state.blog.loading;
export const selectBlogsError = (state) => state.blog.error;
export const selectBlogById = (state, id) => 
  state.blog.blogs.find(blog => blog.id === id);