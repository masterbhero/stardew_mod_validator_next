// import modList, { modListDisplay } from "../../interface/modList";

// function calculateStatus(mod: modList) {
//   return 3;
// }

// export function makeDisplayList(mod_list: modList[] | undefined) {
//   const newDisplay: modListDisplay[] = [];
//   if (mod_list) {
//     for (let mod of mod_list) {
//       newDisplay.push({
//         ...mod,
//         displayDependency: true,
//         status: calculateStatus(mod),
//       });
//     }
//   }

//   return newDisplay;
// }

// function loopAndDisplayDependency( 
//   mod_list: modListDisplay[] | undefined,
//   modview?: boolean
// ): JSX.Element;
// function loopAndDisplayDependency(
//   mod_list: modListDisplay[] | undefined,
//   modview?: boolean
// ): JSX.Element[];
// function loopAndDisplayDependency(
//   mod_list: modListDisplay[] | undefined,
//   modview?: boolean
// ): any {
//   if (mod_list && mod_list.length > 0) {
//     const display_array: JSX.Element[] = [];
//     mod_list.map((value, key) => {
//       display_array.push(
//         <div
//           key={key}
//           className={`tw-m-4 tw-flex ` + (modview ? `tw-ml-0` : `tw-ml-20`)}
//         >
//           <div
//             className={
//               `
//                 tw-flex tw-flex-col 
//                 tw-m-4 tw-ml-10 
//                 tw-px-4 tw-py-2 
//                 tw-border-2 tw-rounded-3xl 
//                 tw-h-[calc(16px+64px+36px+17px)]
//                 tw-bg-[#5880bf]
//               ` + //tw-min-w-[160px]
//               (modview ? `tw-mt-0` : `tw-mt-10`)
//             }
//             id="main"
//           >
//             <div className="tw-flex ">
//               <div className={`tw-w-16 tw-h-16`}>
//                 <Image
//                   src={modview ? FolderIcon : DependencyIcon}
//                   alt=""
//                   priority 
//                   className="tw-w-full tw-h-auto"
//                 />
//                 {/* <Image src={modview ? FolderIcon : DependencyIcon} alt="" width={150} height={150}/> */}
//               </div>
//               <div className="tw-flex tw-items-center tw-justify-center tw-pl-4">
//                 <div
//                   className={`${Styles.name} ${
//                     Styles[displayStatus(value.status)]
//                   }`}
//                 >
//                   {value.name}
//                 </div>
//               </div>
//             </div>
//             <div className="tw-flex tw-justify-between tw-mt-2">
//               <div>
//                 <button className={`${Styles.button} ${Styles.edit}`}>
//                   edit
//                 </button>
//               </div>
//               <div>
//                 <button className={`${Styles.button} ${Styles.remove}`}>
//                   remove
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className={`tw-mt-24`}>
//             {loopAndDisplayDependency(value.dependency)}
//           </div>
//         </div>
//       );
//     });
//     return display_array;
//   } else {
//     return <div className="tw-text-white"></div>;
//   }
// }

// export default loopAndDisplayDependency;
