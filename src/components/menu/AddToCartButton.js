export default function AddToCartButton({hasSizesOrExtras, onClick, basePrice}){
    return (
        <button onClick={onClick} className="mt-4 bg-[#f13a01] primary rounded-full px-8 py-2 cursor-pointer">
                {hasSizesOrExtras ? (
                    <span>Add to cart (from ₹{basePrice})</span> ) : (
                        <span>Add to cart ₹{basePrice}</span>
                )}
                </button>
    );
}