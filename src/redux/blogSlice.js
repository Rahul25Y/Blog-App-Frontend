import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBlogs, createBlog, updateBlog, deleteBlog, toggleLikeBlog, getBlogById } from '../services/api';

// Async Thunks
export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllBlogs();
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
  }
});

export const fetchSingleBlog = createAsyncThunk('blog/fetchSingleBlog', async (id, { rejectWithValue }) => {
  try {
    const response = await getBlogById(id);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog');
  }
});

export const createNewBlog = createAsyncThunk('blog/createNewBlog', async (blogData, { rejectWithValue }) => {
  try {
    const response = await createBlog(blogData.title, blogData.description, blogData.draft);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create blog');
  }
});

export const editBlog = createAsyncThunk('blog/editBlog', async ({ id, title, description, draft }, { rejectWithValue }) => {
  try {
    const response = await updateBlog(id, title, description, draft);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update blog');
  }
});

export const removeBlog = createAsyncThunk('blog/removeBlog', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteBlog(id);
    if (response.success) {
      return id;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
  }
});

export const likeBlog = createAsyncThunk('blog/likeBlog', async (id, { rejectWithValue, getState }) => {
  try {
    const response = await toggleLikeBlog(id);
    if (response.success) {
      const user = getState().user.user;
      return { id, userId: user._id };
    }
    return rejectWithValue(response.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to toggle like');
  }
});

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchBlogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // fetchSingleBlog
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // createNewBlog
      .addCase(createNewBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Pushing to state is not fully populated, but we can unshift it for now.
        // Re-fetching or manual updating with populate might be needed.
        state.blogs.unshift(action.payload);
      })
      .addCase(createNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editBlog
      .addCase(editBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          const oldCreator = state.blogs[index].creator;
          state.blogs[index] = { ...action.payload, creator: oldCreator };
        }
        if (state.currentBlog && state.currentBlog._id === action.payload._id) {
          state.currentBlog = { ...state.currentBlog, ...action.payload };
        }
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // removeBlog
      .addCase(removeBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(b => b._id !== action.payload);
        if (state.currentBlog && state.currentBlog._id === action.payload) {
          state.currentBlog = null;
        }
      })
      .addCase(removeBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // likeBlog
      .addCase(likeBlog.fulfilled, (state, action) => {
        const { id, userId } = action.payload;
        
        const blog = state.blogs.find(b => b._id === id);
        if (blog) {
          if (blog.likes?.includes(userId)) {
            blog.likes = blog.likes.filter(u => u !== userId);
          } else {
            if (!blog.likes) blog.likes = [];
            blog.likes.push(userId);
          }
        }
        
        if (state.currentBlog && state.currentBlog._id === id) {
          if (state.currentBlog.likes?.includes(userId)) {
            state.currentBlog.likes = state.currentBlog.likes.filter(u => u !== userId);
          } else {
            if (!state.currentBlog.likes) state.currentBlog.likes = [];
            state.currentBlog.likes.push(userId);
          }
        }
      });
  }
});

export const { clearCurrentBlog, clearError } = blogSlice.actions;
export default blogSlice.reducer;
