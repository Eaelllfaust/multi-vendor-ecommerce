import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Package } from 'lucide-react';

import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );

  const { pathname } = useLocation();
  const [showShidebar, setShowShidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirect_card_page = () => {
    if (userInfo) {
      navigate(`/card`);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [userInfo]);

  return (
    <div className="w-full py-5">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap justify-between md-lg:gap-8">
          <img
            className="w-[80px] h-auto"
            src="http://localhost:3001/images/nexigolarge.svg"
            alt="logo"
          />
          <div className="w-8/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-center items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className="flex h-[50px] items-center relative gap-5">
                  <div className="relative after:h-[25px]">
                    <Select onValueChange={(value) => setCategory(value)}>
                      <SelectTrigger className="w-[120px] text-slate-100 font-semibold bg-transparent px-2 h-full outline-0 border-none">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="nex_drop">
                        {categorys
                          .slice()
                          .sort((a, b) =>
                            a.name.localeCompare(b.name)
                          ) // Sort alphabetically by category name
                          .map((c, i) => (
                            <SelectItem className='hover:text-white cursor-pointer' key={i} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    className="w-full placeholder-white dark:bg-black text-slate-100 outline-0 px-3 h-full input_nex"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Search for products, merchants"
                  />
                  <button
                    onClick={search}
                    className="bg-white nex_button font-semibold"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={search}
            className="flex items-center bg-white nex_button button_100 font-semibold text-white hover:bg-white hover:text-black"
          >
            Sell online  <Package className="ml-2" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Headers;
