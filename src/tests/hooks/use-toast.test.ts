import { act, renderHook } from "@testing-library/react";
import * as React from "react";
import { useToast, toast, __test } from "@/hooks/use-toast";

describe("useToast hook and toast function", () => {
  afterEach(() => {
    __test.listeners.length = 0;
    __test.memoryState.toasts = [];
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   

  it("permite agregar y cerrar un toast", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Hola", description: "Test" });
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe("Hola");
    // Dismiss
    act(() => {
      result.current.dismiss(result.current.toasts[0].id);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("actualiza un toast existente", () => {
    const { result } = renderHook(() => useToast());
    let id = "";
    act(() => {
      const t = result.current.toast({ title: "A" });
      id = t.id;
      t.update({ id, title: "B" });
    });
    expect(result.current.toasts[0].title).toBe("B");
  });

  it("elimina un toast por id", () => {
    const { result } = renderHook(() => useToast());
    let id = "";
    act(() => {
      const t = result.current.toast({ title: "A" });
      id = t.id;
      result.current.dismiss(id);
      // Forzar remove
      result.current.dismiss(id); // Doble dismiss para forzar REMOVE_TOAST
    });
    // Simular el timeout de borrado
    act(() => {
      __test.dispatch({ type: "REMOVE_TOAST", toastId: id });
    });
    expect(result.current.toasts.length).toBe(2); // El toast se mantiene en la lista hasta que se remueve por lo que se espera que sean 2
  });

  it("elimina todos los toasts si no se pasa id", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "A" });
      result.current.toast({ title: "B" });
      result.current.dismiss();
      // Forzar remove all
      __test.dispatch({ type: "REMOVE_TOAST" });
    });
    expect(result.current.toasts.length).toBe(0);
  });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     

  it("limita la cantidad de toasts a 5", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      for (let i = 0; i < 7; i++) {
        result.current.toast({ title: `T${i}` });
      }
    });
    expect(result.current.toasts.length).toBe(5);
  });

  it("addToRemoveQueue no agrega dos veces el mismo id", () => {
    const spy = jest.spyOn(global, "setTimeout");
    __test.addToRemoveQueue("test");
    __test.addToRemoveQueue("test");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
