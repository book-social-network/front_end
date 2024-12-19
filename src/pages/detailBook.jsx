import { toast } from 'react-toastify';
// ...existing code...

const DetailBook = () => {
    // ...existing code...
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // ...existing code...
            } catch (error) {
                toast.error(error.response?.data?.message || "Có lỗi xảy ra khi tải thông tin sách");
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            // ...existing code...
        } catch (error) {
            toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
        }
    };

    const handleBuyNow = async () => {
        try {
            // ...existing code...
        } catch (error) {
            toast.error(error.response?.data?.message || "Có lỗi xảy ra khi mua sách");
        }
    };

    // ...existing code...
};
