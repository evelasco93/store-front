import React from 'react'
import { ProductCard } from '../../src/components/ProductCard'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'
import { describe, it, expect, jest } from '@jest/globals'
import {
  ProductDTO,
  VariantDTO,
  OptionDTO,
} from '@store-front-typescript-bootcamp/schemas'
import { ReactNode } from '@tanstack/react-router'

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactNode }) => children,
}))

const mockedOption: OptionDTO = {
  size: 'Test',
  stock: 1,
}

const mockedVariant: VariantDTO = {
  color: 'Test',
  colorCode: 'Test Color',
  id: 'testVariantId',
  imageUrls: ['url1', 'url2'],
  options: [mockedOption],
}

const mockedProduct: ProductDTO = {
  collectionId: 'testCollectionId',
  collectionName: 'TEST COLLECTION',
  id: 'testProductId',
  name: 'Test Product',
  price: 20.24,
  variants: [mockedVariant],
  description: 'This is just a test product',
}

describe('ProductCard', () => {
  it('Loads and displays the ProductCard Component', async () => {
    render(<ProductCard product={mockedProduct} />)

    // Validate text content
    const name = await screen.findByText('Test Product')
    const description = await screen.findByText('TEST COLLECTION')
    const price = await screen.findByText('$20.24')

    expect(name).toHaveTextContent(mockedProduct.name)
    expect(description).toHaveTextContent(mockedProduct.collectionName)
    expect(price).toHaveTextContent(`$${mockedProduct.price.toFixed(2)}`)

    // Validate that the image is in the document
    const image = screen.getByAltText(mockedProduct.variants[0].imageUrls[0])
    expect(image).toBeInTheDocument()
  })
})
