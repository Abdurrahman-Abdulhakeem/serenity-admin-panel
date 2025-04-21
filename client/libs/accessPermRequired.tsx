// "use client";

// import Modal from "@/app/components/modals/BaseModal";
// import { getAuthState } from "@/redux/features/slices/authSlice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const accessPermRequired = (
//   WrappedComponent: React.ComponentType,
//   allowedRoles: string[] = []
// ) => {
//   const AuthenticatedComponent = () => {
//     const { userData } = useSelector(getAuthState);
//     const router = useRouter();
//     const [isOpen, setIsOpen] = useState<boolean>(true);

//     useEffect(() => {
//       if (!userData) {
//         router.push("/login");
//       } else if (
//         allowedRoles.length &&
//         !allowedRoles.includes(userData.user?.role as string)
//       ) {
//         // router.push("/dashboard");
//       }
//     }, [userData, router]);

//     if (
//       !userData ||
//       (allowedRoles.length &&
//         !allowedRoles.includes(userData.user?.role as string))
//     ) {
//       return (
//         <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//           <h3 className="text-xl font-semibold mb-4">
//             You&apos;re not Authorized for this page!
//           </h3>

//           <button
//             onClick={() => setIsOpen(false)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             <Link href="/dashboard"> Go Back </Link>
//           </button>
//         </Modal>
//       );
//     }

//     return <WrappedComponent />;
//   };

//   return AuthenticatedComponent;
// };

// export default accessPermRequired;
