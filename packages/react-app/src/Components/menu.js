import { Disclosure } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import RouteIndex from "../routesIndex";

let baseNavClass = " block px-3 py-2 rounded-md text-base font-medium";
let activeClassName = "bg-gray-900 text-white " + baseNavClass;
let inactiveClassName =
  "text-gray-300 hover:bg-gray-700 hover:text-white" + baseNavClass;

export default function Header({ web3Prop }) {
  const {
    ethers,
    address,
    readContracts,
    writeContracts,
    // balance,
    web3Modal,
    loadWeb3Modal,
    signMessage,
    logoutOfWeb3Modal,
    tx,
    faucetTx,
    gasPrice,
    signed,
    setSigned,
  } = web3Prop;

  function ConnectButton() {
    if (web3Modal) {
      if (web3Modal.cachedProvider && signed) {
        return (
          <button className={activeClassName} onClick={logoutOfWeb3Modal}>
            Log out
          </button>
        );
      } else {
        return (
          <button className={activeClassName} onClick={signMessage}>
            Connect wallet
          </button>
        );
      }
    }
  }

  function Faucet() {
    return (
      <button
        className={`ml-1 ${activeClassName}`}
        onClick={() => {
          faucetTx({
            to: address,
            value: ethers.utils.parseEther("0.01"),
          });
        }}
      >
        💰 Grab funds from the faucet ⛽️
      </button>
    );
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {RouteIndex.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                              isActive ? activeClassName : inactiveClassName
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Con add stuff here for things on the right like wallet connection*/}
                      <ConnectButton />
                      <Faucet />
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {RouteIndex.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive ? activeClassName : inactiveClassName
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="" alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        Put wallet address
                      </div>
                      {/* <div className="text-sm font-medium leading-none text-gray-400">
                        
                      </div> */}
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
