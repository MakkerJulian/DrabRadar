import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import * as Promise from 'bluebird';

export default class WeatherDataSeeder implements Seeder {
  async run(
    datasource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const weatherdataFactory = factoryManager.get(WeatherData);
    const weatherdataRepository = datasource.getRepository(WeatherData);
    const weatherstationRepository = datasource.getRepository(Weatherstation);

    await weatherdataRepository.clear();

    const weatherstations = await weatherstationRepository.find();

    let counter = 1;
    const length = weatherstations.length;

    const concurrency = 50; // Adjust this number based on your system's capabilities, more is faster but more resource intensive

    await Promise.map(
      weatherstations,
      async (station) => {
        console.log(`Inserting weatherdata for station ${counter}/${length}`);
        counter++;
        let prev: WeatherData = null;
        const data = await Promise.all(
          Array(10)
            .fill('')
            .map(async () => {
              const weatherdata = await weatherdataFactory.make();
              weatherdata.weatherstation = station;
              weatherdata.temp = prev
                ? prev.temp + Math.random() * 2 - 1
                : Math.random() * 40 - 20;
              weatherdata.windspeed = prev
                ? prev.windspeed + Math.random() * 2 - 1
                : Math.random() * 40;
              weatherdata.s_airpressure = prev
                ? prev.s_airpressure + Math.random() * 2 - 1
                : Math.random() * 550 + 500;
              weatherdata.precipitation = prev
                ? prev.precipitation + Math.random() * 2 - 1
                : Math.random() * 100;
              weatherdata.clouds = prev
                ? prev.clouds + Math.random() * 2 - 1
                : Math.random() * 100;
              weatherdata.freezing = weatherdata.temp < 0;
              weatherdata.hail = weatherdata.freezing && Math.random() < 0.1;

              prev = weatherdata;

              return weatherdata;
            }),
        );
        await weatherdataRepository.insert(data);
      },
      { concurrency },
    );
  }
}
