import Image from "next/image";
import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({onAddToCart, ...item}){
    const {image, name, basePrice, description,sizes, extraIngredientPrices,} = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
                <div className="text-center">
                    <Image width={96} height={96} src={image} className="max-h-auto max-h-24 block mx-auto" alt="image1" />
                </div>
                <h4 className="font-semibold text-xl my-3">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3">
                    {description}
                </p>
                {/* <button onClick={onAddToCart} className="mt-4 bg-[#f13a01] primary rounded-full px-8 py-2 cursor-pointer">
                {hasSizesOrExtras ? (
                    <span>Add to cart (from ₹{basePrice})</span> ) : (
                        <span>Add to cart ₹{basePrice}</span>
                )}
                </button> */}
                <AddToCartButton
                image={image}
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                basePrice={basePrice}
                />
            </div>
    );
}