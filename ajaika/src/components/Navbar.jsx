import { Disclosure } from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Cart from "./Cart";
import SearchBar from "./Sbar";

const navigation = [
  { name: "Home", href: "/", current: false },
  {name: "About", href: "#", current: false },
  { name: "Partnerships", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

export default function Navbar({ cartItems, products, setPid }) {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure as="nav" className="bg-[#ffb800]">
      {({ open: menuOpen }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="sm:hidden flex flex-col items-center pt-3 pb-2">
              <img
                alt="Ajaika Logo"
                src="http://ajaika.com/assets/img/ajaika-logo%20(1).png"
                className="h-10 w-auto sm:h-14"
              />

              <div className="w-full px-2 mt-2">
                <SearchBar products={products} setPid={setPid} />
              </div>
            </div>
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="p-2 text-gray-800 hover:text-gray-900 focus:ring-2 focus:ring-white focus:outline-none">
                  {menuOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </Disclosure.Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden pr-4">
                <button onClick={() => setOpen(true)} className="relative p-1 text-gray-800">
                  <ShoppingCartIcon className="size-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
              <div className="hidden sm:flex flex-1 items-center sm:justify-start">
                <img
                  alt="Ajaika Logo"
                  src="http://ajaika.com/assets/img/ajaika-logo%20(1).png"
                  className="h-10 w-auto sm:h-14 mr-4"
                />
                <div className="hidden sm:flex space-x-6">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="text-white hover:bg-gray-700 px-4 py-2 rounded-md">
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>


              <div className="hidden sm:flex items-center space-x-4">
                <SearchBar products={products} setPid={setPid} />
                <button onClick={() => setOpen(true)} className="relative p-1 text-gray-800">
                  <ShoppingCartIcon className="size-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

  
          {open && <Cart open={open} setOpen={setOpen} products={products} cartItems={cartItems} />}
        </>
      )}
    </Disclosure>
  );
}
