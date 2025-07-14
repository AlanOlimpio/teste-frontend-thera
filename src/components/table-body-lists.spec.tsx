import { render, screen } from "@testing-library/react";
import { ProductTableRow } from "./product-table-row";

const productListMock = [
  {
    id: "6931037f-1ce4-4805-aefb-a6703cf99733",
    name: "Notebook Acer Nitro V15",
    description: "Processador: Intel Core i5-13420H (10 núcleos - 6P+4E)",
    category: "10",
    price: 4640,
    created_at: "2025-07-14T14:36:11.435Z",
    imageUrl: "/uploads/51Wv-tEUn6L._AC_SX679_.jpg",
    userId: null,
  },
];

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("<ProductTableRow/>", () => {
  it("should display an item in the product list", () => {
    const { container } = render(
      <table>
        <tbody>
          <ProductTableRow
            product={productListMock[0]}
            key={`identifier${productListMock[0].id}`}
          />
        </tbody>
      </table>
    );

    const productName = screen.getByText("Notebook Acer Nitro V15");
    const productCategory = screen.getByText("Eletrodomésticos");
    const productPrice = screen.getByText("R$ 4.640,00");
    const productDescription = screen.getByText(
      "Processador: Intel Core i5-13420H (10 núcleos - 6P"
    );
    const productImage = screen.getByAltText(
      "Notebook Acer Nitro V15"
    ) as HTMLImageElement;

    expect(productName).toBeInTheDocument();
    expect(productCategory).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productImage.src).toContain(
      "/_next/image?url=%2Fuploads%2F51Wv-tEUn6L._AC_SX679_.jpg&w=256&q=75"
    );
    expect(container).toMatchSnapshot();
  });
});
