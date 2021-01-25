import DataTable from "./components/main-table";


function App() {
  return (
    <div>
     <h2 style={{margin:"20px auto",display:"flex", justifyContent:"center",backgroundColor:"black",width:"90%",alignItems:"center",padding:"20px",color:"white",borderRadius:"15px"}}>VersionTracking</h2>
     <div  style={{margin:"20px auto",display:"flex", justifyContent:"center"}}>
      <DataTable/>
     </div>
    </div>
  );
}

export default App;
