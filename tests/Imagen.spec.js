import { mount } from '@vue/test-utils';
import Imagen from "../src/components/Imagen.vue";

describe("Imagen.vue", () => {
    it("muestra el loader antes de cargar la imagen", () => {
        const wrapper = mount(Imagen, {
            props: {
                image: {
                    id: "1",
                    download_url: "https://picsum.photos/id/1/400/300",
                },
            },
        });

        expect(wrapper.find("div").classes()).toContain("dark:bg-gray-800");
        expect(wrapper.find("img").classes()).toContain("opacity-0");
    });

    it("carga la imagen correctamente", async () => {
        const wrapper = mount(Imagen, {
            props: {
                image: {
                    id: "1",
                    download_url: "https://picsum.photos/id/1/400/300",
                },
            },
        });

        await wrapper.find("img").trigger("load");
        expect(wrapper.find("img").classes()).toContain("opacity-100");
    });
});
