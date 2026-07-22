import {

  CardContent,

} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import UpdateUser from "./UpdateUser"
import ChangePassword from "./ChangePassword"

export function TabsDemo() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="changepassword">Change Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div>
          <CardContent className="text-sm text-muted-foreground">
            <UpdateUser />
          </CardContent>
        </div>
      </TabsContent>
      <TabsContent value="changepassword">
        <div>
          <CardContent className="text-sm text-muted-foreground">
            <ChangePassword />
          </CardContent>
        </div>
      </TabsContent>
    </Tabs>
  )
}
