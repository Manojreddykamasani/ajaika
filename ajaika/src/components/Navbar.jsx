import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Cart from "./Cart";
import SearchBar from "./Sbar";

const navigation = [
  { name: "About", href: "#", current: false },
  { name: "Partnerships", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ cartItems, products, pid, setPid }) {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure as="nav" className="bg-[#ffb800]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* Mobile Layout: Logo and Search */}
        <div className="sm:hidden flex flex-col items-center pt-3 pb-2">
          {/* Logo - Centered on Mobile */}
          <div className="flex justify-center">
            <img
              alt="Ajaika Logo"
              src="http://ajaika.com/assets/img/ajaika-logo%20(1).png"
              className="h-10 w-auto sm:h-14"
            />
          </div>

          {/* Search Bar - Below Logo on Mobile */}
          <div className="w-full px-2 mt-2">
            <SearchBar products={products} pid={pid} setPid={setPid} />
          </div>
        </div>

        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button & Cart Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:text-gray-900 focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Mobile Cart Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden pr-4">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="relative rounded-full p-1 text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">View cart</span>
              <ShoppingCartIcon aria-hidden="true" className="size-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {new Set(cartItems.map((item) => item.id)).size}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Layout: Logo & Navigation */}
          <div className="hidden sm:flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Ajaika Logo"
                src="http://ajaika.com/assets/img/ajaika-logo%20(1).png"
                className="h-10 w-auto sm:h-14 mr-4"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-white hover:bg-gray-700 hover:text-white",
                      "rounded-md px-4 py-2 text-sm font-medium flex items-center"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Search & Cart Button */}
          <div className="hidden sm:flex items-center space-x-4 pr-2">
            <SearchBar products={products} pid={pid} setPid={setPid} />
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="relative rounded-full p-1 text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">View cart</span>
              <ShoppingCartIcon aria-hidden="true" className="size-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {new Set(cartItems.map((item) => item.id)).size}
                </span>
              )}
            </button>
          </div>

          {/* Cart Modal */}
          {open && <Cart open={open} setOpen={setOpen} products={products} cartItems={cartItems} />}
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "text-white"
                  : "text-white hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
