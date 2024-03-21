import { Inter } from "next/font/google";
import "./globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Customer service",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#09090B] text-[#FAFAFA] max-w-[1440px] m-auto 2xl: px-[100px]`}>

                <div className="mt-[50px] border-b-[1px] border-b-[#46464a] pb-[20px] flex justify-between items-center">


                    <nav>
                        <ul className="flex gap-[20px]">
                            <li className="text-[15px]">
                                Customer service report - When 0 chats that day - sort NaN
                            </li>
                        </ul>
                    </nav>

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>

                {children}

            </body>
        </html>
    );
}
