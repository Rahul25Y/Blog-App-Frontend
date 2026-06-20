import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createNewBlog, editBlog, fetchSingleBlog, clearCurrentBlog } from '../../redux/blogSlice';
import toast from 'react-hot-toast';

const CreateBlog = ({ isEdit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBlog, loading } = useSelector(state => state.blog);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchSingleBlog(id)).then(() => setInitialFetchDone(true));
    } else {
      setInitialFetchDone(true);
    }
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, isEdit, id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: isEdit && currentBlog ? currentBlog.title : '',
      description: isEdit && currentBlog ? currentBlog.description : '',
      draft: isEdit && currentBlog ? currentBlog.draft : false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
      description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
      draft: Yup.boolean()
    }),
    onSubmit: async (values) => {
      let resultAction;
      if (isEdit) {
        resultAction = await dispatch(editBlog({ id, ...values }));
      } else {
        resultAction = await dispatch(createNewBlog(values));
      }

      if (createNewBlog.fulfilled.match(resultAction) || editBlog.fulfilled.match(resultAction)) {
        toast.success(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
        navigate('/my-blogs');
      } else {
        toast.error(resultAction.payload || "An error occurred");
      }
    }
  });

  if (isEdit && !initialFetchDone) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-3 px-md-4 fade-in-el">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="custom-card p-4 p-md-5">
            <h2 className="fw-bold text-color mb-4">{isEdit ? 'Edit Blog' : 'Create New Blog'}</h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold text-color">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control form-control-custom ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                  placeholder="Enter a catchy title..."
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="invalid-feedback">{formik.errors.title}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-color">Content</label>
                <textarea
                  name="description"
                  className={`form-control form-control-custom ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                  placeholder="Write your amazing blog content here..."
                  rows="6"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">{formik.errors.description}</div>
                )}
              </div>

              <div className="mb-4 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="draftSwitch"
                  name="draft"
                  checked={formik.values.draft}
                  onChange={formik.handleChange}
                />
                <label className="form-check-label text-color" htmlFor="draftSwitch">
                  Save as Draft (Hide from public feed)
                </label>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-5">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary pill-btn-hover"
                  onClick={() => navigate('/my-blogs')}
                  style={{ borderRadius: "999px", padding: "10px 28px", fontWeight: "600" }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary pill-btn-hover d-flex align-items-center gap-2"
                  disabled={loading || !formik.isValid}
                  style={{ borderRadius: "999px", padding: "10px 28px", fontWeight: "600", boxShadow: "0 8px 20px rgba(37,99,235,0.25)" }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : null}
                  {isEdit ? 'Update Blog' : 'Publish Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
