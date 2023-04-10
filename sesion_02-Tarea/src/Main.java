import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        List<Vehiculo> vehiculos = new ArrayList<>();
        vehiculos.add(new Vehiculo("Toyota", "Corolla", 20000));
        vehiculos.add(new Vehiculo("Honda", "Civic", 22000));
        vehiculos.add(new Vehiculo("Mazda", "3M", 18000));
        vehiculos.add(new Vehiculo("Chevrolet", "Camaro", 40000));
        vehiculos.add(new Vehiculo("Ford", "Mustang", 38000));
        vehiculos.add(new Vehiculo("Toyota", "RAV4", 40000));
        vehiculos.add(new Vehiculo("Nissan", "Sentra", 25000));
        vehiculos.add(new Vehiculo("Kia", "Optima", 28000));
        vehiculos.add(new Vehiculo("Hyundai", "Elantra", 23000));
        vehiculos.add(new Vehiculo("Volkswagen", "Jetta", 27000));
        vehiculos.add(new Vehiculo("BMW", "X5", 60000));
        vehiculos.add(new Vehiculo("Mercedes-Benz", "C-Class", 50000));
        vehiculos.add(new Vehiculo("Audi", "A4", 45000));
        vehiculos.add(new Vehiculo("Lexus", "RX", 55000));
        vehiculos.add(new Vehiculo("Subaru", "Forester", 32000));
        vehiculos.add(new Vehiculo("Mitsubishi", "Outlander", 35000));
        vehiculos.add(new Vehiculo("Toyota", "Camry", 35000));
        vehiculos.add(new Vehiculo("Honda", "Accord", 32000));
        vehiculos.add(new Vehiculo("Mazda", "CX-5", 38000));
        vehiculos.add(new Vehiculo("Chevrolet", "Equinox", 30000));
        vehiculos.add(new Vehiculo("Ford", "Escape", 28000));
        vehiculos.add(new Vehiculo("Jeep", "Wrangler", 45000));
        vehiculos.add(new Vehiculo("Ram", "1500", 40000));
        vehiculos.add(new Vehiculo("GMC", "Sierra", 45000));
        vehiculos.add(new Vehiculo("Nissan", "Rogue", 32000));
        vehiculos.add(new Vehiculo("Kia", "Sorento", 36000));
        vehiculos.add(new Vehiculo("Hyundai", "Tucson", 33000));
        vehiculos.add(new Vehiculo("Volkswagen", "Tiguan", 35000));
        vehiculos.add(new Vehiculo("BMW", "3 Series", 50000));
        vehiculos.add(new Vehiculo("Mercedes-Benz", "E-Class", 55000));
        vehiculos.add(new Vehiculo("Audi", "Q5", 48000));
        vehiculos.add(new Vehiculo("Lexus", "ES", 52000));
        vehiculos.add(new Vehiculo("Subaru", "Legacy", 32000));
        vehiculos.add(new Vehiculo("Mitsubishi", "Eclipse Cross", 36000));

        long initialTime = System.nanoTime();
        System.out.println("Lista de vehiculos: ");
        vehiculos.forEach(System.out::println);
        double suma = vehiculos.stream().mapToDouble(Vehiculo::getPrecio).sum();
        // double suma =
        // vehiculos.stream().peek(System.out::println).mapToDouble(Vehiculo::getPrecio).sum();
        System.out.println("Suma Total (secuencial): " + suma);
        long endTime = System.nanoTime();
        System.out.println("La diferencia de tiempo de programación secuencial: "
                + (endTime - initialTime) / 1_000_000_000.0 + " segundos");

        System.out.println("============================================================");

        initialTime = System.nanoTime();
        System.out.println("Lista de vehiculos: ");
        vehiculos.stream().parallel().forEach(System.out::println);
        double sumaParalela = vehiculos.stream().parallel().mapToDouble(Vehiculo::getPrecio).sum();
        // double sumaParalela =
        // vehiculos.stream().parallel().peek(System.out::println).mapToDouble(Vehiculo::getPrecio).sum();
        System.out.println("Suma Total (paralela): " + sumaParalela);
        endTime = System.nanoTime();
        System.out.println("La diferencia de tiempo de programación paralelo: "
                + (endTime - initialTime) / 1_000_000_000.0 + " segundos");
    }
}