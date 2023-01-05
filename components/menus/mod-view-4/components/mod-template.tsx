import { ChangeEvent, RefObject, SetStateAction } from "react";
import modList, { modListDisplay } from "../../../../interface/modList";

interface ModTemplateProps {
  setFilterText: (value: SetStateAction<string>) => void;
  filterdModList: modListDisplay[];
  detail_div_ref: RefObject<HTMLDivElement>;
}

export function ModTemplate(props: ModTemplateProps) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    props.setFilterText(event.target.value);
    console.log("props.detail_div_ref", props.detail_div_ref.current);
  }

  return (
    <div
      id="template mod"
      className={`tw-border-2 tw-border-white tw-ml-4 tw-mb-4 tw-mt-2 tw-px-4 tw-py-4`}
    >
      <input
        type="text"
        className="tw-border-2 tw-border-white tw-bg-transparent tw-pl-2 tw-w-full tw-mb-4"
        onChange={(event) => {
          onInputChange(event);
        }}
      />
      <div>{ModTemplate()}</div>
    </div>
  );

  function ModTemplate() {
    return (
      <div className="tw-flex tw-flex-col tw-h-36 tw-overflow-auto">
        {
          // filter_modListDisplay.map((value,index) => {
          props.filterdModList.map((value, index) => {
            return (
              <button
                key={index}
                className="tw-px-4 tw-py-2 tw-bg-transparent hover:tw-bg-gray-500 tw-transition-all tw-duration-300"
                onClick={() => {
                  set_detail_div_ref(value);
                }}
              >
                <div className="tw-flex">{value.name}</div>
              </button>
            );
          })
        }
      </div>
    );
  }

  function set_detail_div_ref(mod: modListDisplay) {
    const detail_div_ref_children = props.detail_div_ref.current?.children;
    // console.log("detail_div_ref_children", detail_div_ref_children);

    if (props.detail_div_ref.current) {
      const detail_div_ref_children = props.detail_div_ref.current.children;
      for (
        let children = 0;
        children < detail_div_ref_children.length;
        children++
      ) {
        const input =
          detail_div_ref_children[children].querySelectorAll("input")[0];
        const match_id =
          detail_div_ref_children[children].id === "name" ||
          detail_div_ref_children[children].id === "version" ||
          detail_div_ref_children[children].id === "description" ||
          detail_div_ref_children[children].id === "tag" ||
          detail_div_ref_children[children].id === "refFolder" ||
          detail_div_ref_children[children].id === "url";
        if (match_id) {
          const id:
            | "name"
            | "version"
            | "description"
            | "tag"
            | "refFolder"
            | "url" 
            = detail_div_ref_children[children].id as
            | "name"
            | "version"
            | "description"
            | "tag"
            | "refFolder"
            | "url";
          if (id === "tag") {
            let start = ""
            if(mod.tag && mod.tag.length > 0){
              for(let tag of mod.tag){
                if(start !== ""){
                  start = start.concat(",")
                }
                start = start.concat(tag)
              }
            }
            input.value = start
          } else {
            // mod_detail_data[id] = input.value;
            // input.value = mod[id].toString() ? mod[id].toString() : ""
            // if(mod[id] && mod[id].toString() && mod[id] !== undefined){
            //   input.value = mod[id].toString()
            // }
            const text = mod[id]
            if(isString(text)){
              input.value = text
            }
          }
          // console.log(input)
          // input.value = mod[id]
        } else {
          console.log("div not match");
          alert("div not match");
        }
      }
    } else {
      // console.log("no detail_div_ref", "function", function_name);
      // alert("no detail_div_ref");
    }
  }
}

function isString(x: any): x is string {
  return typeof x === "string";
}