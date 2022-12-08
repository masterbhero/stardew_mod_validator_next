interface propsTypeIndexPage {
  file_result: {
    status: boolean;
    data: any;
    message: string;
    name: string;
  }[];
}

export function displayPropsTypeIndexPage(props: propsTypeIndexPage) {
  console.log("props", props);
  console.log("props", props.file_result);
}
