import { IProduct } from '@/services';

import Image from 'next/image';
import Favorite from '../client/Favorite';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="bg-card cursor-pointer text-card-foreground border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Product Image */}
      <div className="aspect-square bg-muted flex items-center justify-center">
        <Image
          src={product.imageUrl}
          itemProp="image"
          alt={`${product.title} - ${product.tier} tier gaming asset`}
          className="object-cover"
          width={80}
          height={80}
        />
      </div>{' '}
      {/* Product Info */}
      <div className="p-4">
        <h3
          className="text-sm font-medium text-foreground mb-1"
          itemProp="name"
        >
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2" itemProp="category">
          {product.tier}
        </p>

        {/* Price with structured data */}
        <div className="flex items-center justify-between">
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <span
              className="text-sm font-medium text-foreground"
              itemProp="price"
            >
              {product.price}
            </span>
            <span
              className="text-sm text-muted-foreground ml-1"
              itemProp="priceCurrency"
              content="ETH"
            >
              ETH
            </span>
            <meta
              itemProp="availability"
              content="https://schema.org/InStock"
            />
          </div>
          <Favorite id={product.id} />
        </div>

        {/* Hidden structured data */}
        <div className="sr-only">
          <span itemProp="description">
            {product.tier} tier digital gaming asset - {product.title}. Premium
            collectible item for gaming enthusiasts.
          </span>
          <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
            <span itemProp="name">TierTrade</span>
          </span>
        </div>
      </div>
    </article>
  );
}
