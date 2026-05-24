import { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from "react-icons/hi";

/**
 * ManageBanners — Admin CRUD for homepage carousel banners.
 */
const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", subtitle: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch all banners (including inactive)
  const fetchBanners = async () => {
    try {
      const { data } = await API.get("/api/banners?all=true");
      setBanners(data);
    } catch (error) {
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit new banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please select a banner image");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("order", banners.length);

      await API.post("/api/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Banner added successfully!");
      setShowModal(false);
      setForm({ title: "", subtitle: "" });
      setImageFile(null);
      setImagePreview("");
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add banner");
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle banner active status
  const toggleActive = async (banner) => {
    try {
      await API.put(`/api/banners/${banner._id}`, {
        isActive: !banner.isActive,
      });
      toast.success(`Banner ${banner.isActive ? "hidden" : "shown"}`);
      fetchBanners();
    } catch (error) {
      toast.error("Failed to update banner");
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await API.delete(`/api/banners/${id}`);
      toast.success("Banner deleted successfully");
      fetchBanners();
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Banners</h2>
          <p className="text-sm text-slate-500">
            {banners.length} banner(s) • Displayed on homepage slider
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-xl shadow-lg shadow-orange-200 transition-all text-sm cursor-pointer"
        >
          <HiOutlinePlus className="text-lg" />
          Add Banner
        </button>
      </div>

      {/* Banner Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 skeleton rounded-xl" />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <span className="text-5xl mb-4 block">🖼️</span>
          <p className="text-slate-500">
            No banners yet. Upload your first banner image!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className={`relative group bg-white rounded-xl overflow-hidden shadow-sm border transition-all ${
                banner.isActive
                  ? "border-green-200"
                  : "border-slate-200 opacity-60"
              }`}
            >
              {/* Image */}
              <div className="aspect-[16/9] bg-slate-100">
                <img
                  src={banner.image}
                  alt={banner.title || "Banner"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => toggleActive(banner)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer ${
                    banner.isActive
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {banner.isActive ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer"
                >
                  <HiOutlineTrash />
                </button>
              </div>

              {/* Banner Info */}
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {banner.title || "Untitled"}
                    </p>
                    {banner.subtitle && (
                      <p className="text-xs text-slate-400 truncate">
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      banner.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {banner.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Banner Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800">
                Add New Banner
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <HiOutlineX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Banner Image *
                </label>
                {imagePreview ? (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg cursor-pointer"
                    >
                      <HiOutlineX />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-200 rounded-xl hover:border-orange-300 cursor-pointer transition-colors">
                    <span className="text-3xl mb-2">📤</span>
                    <span className="text-sm text-slate-500">
                      Click to upload image
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      Recommended: 1920×600 px
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Summer Special Sale"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 text-sm"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Subtitle (optional)
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm({ ...form, subtitle: e.target.value })
                  }
                  placeholder="e.g. Get 30% off on all pizzas!"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !imageFile}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Uploading..." : "Upload Banner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBanners;
