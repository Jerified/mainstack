"use client";

import { useGetWalletQuery } from "@/lib/store/mainstackApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Graph from "./Graph";

const Hero = () => {
  const { data: wallet, isLoading, isError } = useGetWalletQuery();
  const textPrimary = twMerge("text-gray-400 text-sm");

  return (
    <div className="py-[4rem]">
      <div className="md:flex gap-[3rem] lg:gap-[5rem] w-full ">
        <div className="flex-1">
          <div className="flex gap-12 sm:gap-16 items-center">
            <div className="flex flex-col gap-2">
              <p className={textPrimary}>Available Balance</p>

              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-48" />
                </div>
              ) : isError ? (
                <div className="text-red-500 text-sm">
                  Error loading balance
                </div>
              ) : (
                <h2 className="font-bold text-3xl md:text-4xl whitespace-nowrap">
                 {formatCurrency(wallet?.balance || 0)}
                </h2>
              )}
            </div>

            <button
              className="button-primary hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
              disabled={isLoading || isError}
            >
              Withdraw
            </button>
          </div>
          <div className="w-full">
            <Graph />
          </div>
        </div>
        <div className="space-y-8 md:w-[17rem]">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className={textPrimary}>Ledger Balance</span>
              <Image src={"/icons/info.svg"} alt="info" width={16} height={16} className="" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <span className="font-bold text-2xl">
                {formatCurrency(wallet?.ledger_balance)}
              </span>
            )}
          </div>
          
          {/* balance */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className={textPrimary}>Total Payout</span>
              <Image src={"/icons/info.svg"} alt="info" width={16} height={16} className="" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <span className="font-bold text-2xl">
                {formatCurrency(wallet?.total_payout)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className={textPrimary}>Total Revenue</span>
              <Image src={"/icons/info.svg"} alt="info" width={16} height={16} className="" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <span className="font-bold text-2xl">
                {formatCurrency(wallet?.total_revenue)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className={textPrimary}>Pending Payout</span>
              <Image src={"/icons/info.svg"} alt="info" width={16} height={16} className="" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <span className="font-bold text-2xl">
                {formatCurrency(wallet?.pending_payout)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
