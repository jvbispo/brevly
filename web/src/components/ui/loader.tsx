import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader as LoadingIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "../../lib/utils";

interface LoaderProps {
    className?: string;
}

function Loader( { className }: LoaderProps ) {
    return (
        <motion.div
        className={cn("w-9 h-9 flex items-center justify-center", className)}
            // data-progress={isThereAnyPendingUpload}
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
        >
            <LoadingIcon />
        </motion.div>
    )
}

export { Loader }
