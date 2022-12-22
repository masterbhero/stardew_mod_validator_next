import useSetting from "../../../hooks/useSetting";

export default function StatusBar() {

  const settingData = useSetting()

  // console.log("settingData",settingData.data)

  return (
    <div>
      {/* <Circle status={"green"} /> */}
      <div className="tw-mb-10 tw-cursor-default">
        Status
      </div>
      {
        settingData.data?.map((value,index) => {
          return (
            <div key={index} className="tw-flex tw-items-center tw-mb-6">
              <Circle status={(value.status ? `green` : `red`)} />
              <div className="tw-text-white tw-ml-4">
                {
                  value.name
                }
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

const Circle: React.FC<{status: "red" | "yellow" | "green"}> = ({ status }) => {

  const color = (() => {
    switch(status){
        case 'red':
            return `tw-bg-red-500`
        case 'yellow':
            return `tw-bg-yellow-500`            
        case 'green':
            return `tw-bg-green-500`            
        default:
            return `tw-bg-red-500`
    }
  })()

  return (
    <div className={`tw-w-4 tw-h-4 ${color} tw-rounded-full`}></div>
  );
};

