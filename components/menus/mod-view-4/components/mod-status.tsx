import { modListDisplay } from "../../../../interface/modList";

type ModStatusProps = {
  className: string;
  modListDisplayState: modListDisplay[];
};

export function ModStatus(props: ModStatusProps) {
  function getTotal(modList: modListDisplay[]): number {
    return modList.length;
  }

  function getTotalCompleted(modList: modListDisplay[]): number {
    return modList.filter((mod) => mod.status === 1).length;
  }

  function getTotalInstalledNotDependency(modList: modListDisplay[]): number {
    return modList.filter((mod) => mod.status === 2).length;
  }

  function getTotalNotInstalled(modList: modListDisplay[]): number {
    return modList.filter((mod) => mod.status === 3).length;
  }

  return (
    <div className={props.className}>
      <div>Total : {getTotal(props.modListDisplayState)}</div>
      <div>Completed : {getTotalCompleted(props.modListDisplayState)}</div>
      <div>
        InComplete : {getTotalInstalledNotDependency(props.modListDisplayState)}
      </div>
      <div>
        NotInstalled : {getTotalNotInstalled(props.modListDisplayState)}
      </div>
    </div>
  );
}
