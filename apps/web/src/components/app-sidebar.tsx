import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ModalSimulator from "./targets/modal-simulator";
import MultiModalSimulatorTransferTest from "./targets/transfer-test";

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon' style={{
        width:450,
        height:'100%',
        position:'absolute',
    }} variant="floating"  side="right">
      <SidebarHeader />
      <SidebarContent>
        <MultiModalSimulatorTransferTest />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
