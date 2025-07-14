"use client";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ModeToggle } from "./theme-toggle";
import { MenuIcon } from "./menuIcon";
import { LogoIcon } from "./LogoIcon";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="flex h-16 w-full items-center border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl flex w-full items-center px-4 md:px-6">
        <Link href="/home" className="mr-6 flex items-center" prefetch={false}>
          <LogoIcon className="h-5" />
          <span className="sr-only">Next JS</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/home"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/product"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Produtos
            </Link>
          </nav>
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                onClick={toggleOpen}
                variant="outline"
                size="icon"
                className="lg:hidden"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Menu</SheetTitle>
              <div className="grid gap-6 p-6">
                <Link
                  href="/home"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                  onClick={toggleOpen}
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                  onClick={toggleOpen}
                >
                  Produtos
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
