import React, { useState, useEffect, Suspense } from "react";
import { Button, Row, Col, Card, Table, Checkbox, Tooltip } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import ModalNuevaTarea from "./componentes/ModalNuevaTarea";
import { useSelector, useDispatch } from "react-redux";


import { useListarTarea } from "../src/services/tareas.services";

const { Meta } = Card; // Agrega esto si necesitas usar Meta de Card

function App() {
  const [titulo, settitulo] = useState("Tarea CRUD");
  const [jsondata, setjsondata] = useState([]);
  const [modalIsOpen, setModal] = useState(false);
  const [obj, setObj] = useState({});
  const [accion, setAccion] = useState("Editar");
 // const loadingtar= useSelector((store) => store.persistedReducer.crud.setloading);




  const { data, error, isLoading } = useListarTarea();
  useEffect(() => {
    if (Array.isArray(data)) {
      setjsondata(data);
    }
  }, [data/* ,loadingtar */])
  const toggle = () => {
    setObj({});
    setModal(!modalIsOpen);
  };
  const abrirModalNuevo = () => {
    setModal(!modalIsOpen);
    setAccion("Nuevo");
    setObj([]);
};


  const columns = [
    {
      title: () => { return <span className="text-warning">Nro</span> },
      dataIndex: "nro",
      key: "nro",
      align: "center",
    },
    {
      title: () => { return <span className="text-warning">Title</span> },
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: () => { return <span className="text-warning">Completed</span> },
      dataIndex: "completed",
      key: "completed",
      align: "center",
    },
    {
      title: () => { return <span className="text-warning">Actions</span> },
      dataIndex: "action",
      key: "action",
      align: "center",
    },
  ];


  const datatable = jsondata.map((value, key) => {
    // console.log(value);
    return {
      nro: key + 1,
      title: value.title,
      completed: <>
        <Checkbox /* onChange={onChange} */></Checkbox>
      </>,
      action:
        <Tooltip key="tooltipdelete" placement="leftTop" title={<span>Eliminar</span>}>
          <DeleteTwoTone
            className="antd-dropdown-icon-text"
            twoToneColor="#FF0000"
            onClick={() => {
              /*  let obj = dtatarjeta.find((x) => x.key === key);
               setObj(obj)
               setModalEliminar(!modalEliminar) */
              // Acción para eliminar
            }}
          />
        </Tooltip>

    };
  });








  return (
    <>
      <ModalNuevaTarea
        modalIsOpen={modalIsOpen}
        toggle={toggle}
        Accion={accion}
        listar={accion}
      >
      </ModalNuevaTarea>
      <Suspense fallback={<div>Cargando...</div>}>
        <div>
          <div>
            <div id="cargando" style={{ display: "none" }}>
            </div>
            <div id="div_principal" style={{ display: "block" }}>
              <Row>
                <Col span={24}>
                  <div className="w-100 px-2 px-xl-5 text-center">
                    <h1
                      className="bg-white text-secondary"
                      style={{
                        fontSize: "50px",
                        fontWeight: "600",
                        marginBottom: "16px", // Ajusta el espacio entre el título y el botón
                      }}
                    >
                      {titulo}
                    </h1>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col>
              <Button className="export-button" onClick={abrirModalNuevo} type="primary">
                Nuevo
              </Button>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col span={24}>
              <Table
                columns={columns}
                size="middle"
                pagination={{
                  position: ["none", "bottomCenter"],
                  defaultPageSize: 20,
                  hideOnSinglePage: true,
                  pageSizeOptions: [50, 100, 200, 300],
                }}
                showSizeChanger={false}
                dataSource={datatable}
              />
            </Col>
          </Row>

        </div>
      </Suspense>
    </>
  );
}

export default App;
