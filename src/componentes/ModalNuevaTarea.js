import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox, Modal, Form } from "antd";
import { useCreateTask } from "../../src/services/tareas.services";
import { useSelector, useDispatch } from "react-redux";
import { SetloadingCrud } from "../redux/crud/crudDuck";


function ModalNuevaTarea(props) {
    const [form] = Form.useForm();
    const [obj, setobj] = useState({});
    const createTaskMutation = useCreateTask();
    const dispatch = useDispatch();


    const onFinish = (values) => {
        var obj = {
            title: values.title,
            completed: values.completed || false, // Valor predeterminado a false si no está marcado
        };
        // console.log(obj);
       // dispatch(SetloadingCrud(true))
        const { data, error } = createTaskMutation.mutateAsync(obj).then(() => {
            reset();
        }, (error) => {

        }).finally(() => {
          //  dispatch(SetloadingCrud(true))
        });


    };

    // useEffect(() => {
    //     console.log('obj');
    //     console.log(obj);
    // }, [obj]);

    const reset = () => {
        form.setFieldValue({
            title: "",
            completed: false,

        });
        props.toggle();
    }

    return (
        <Modal
            open={props.modalIsOpen}
            onCancel={props.toggle?.bind(null)}
            title={props.Accion === "Editar" ? "Editar Color" : "Nuevo"}
            footer={null}
            destroyOnClose={true}
            width={400}
        >
            <Form onFinish={onFinish} form={form}>
                <Form.Item
                    label={<span className="text-primary">title</span>}
                    showSearch
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Campo obligatorio",
                        },
                    ]}
                >
                    <Input placeholder="Escribe Titulo" />
                </Form.Item>

                <Form.Item
                    label={<span className="text-primary">completed</span>}
                    showSearch
                    name="completed"
                    valuePropName="checked"
                >
                    <Checkbox></Checkbox>
                </Form.Item>

                <Button htmlType="button" onClick={() => form.submit()} className="primary">
                    Save
                </Button>
            </Form>
        </Modal>
    );
}

export default ModalNuevaTarea;
